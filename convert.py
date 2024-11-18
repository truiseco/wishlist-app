import csv
import json
from typing import Dict, List, Optional
import re

def clean_price(price: str) -> Optional[str]:
    """Clean price strings and standardize format."""
    if not price or price == '?' or price == '↑':
        return None
    # Remove any leading/trailing whitespace and convert to string
    price = str(price).strip()
    # Handle "Any amount" or similar cases
    if 'any' in price.lower():
        return "Any amount"
    # Standardize number format
    price = price.replace(',', '')
    if price.startswith('$'):
        # Already in correct format
        return price
    try:
        # Convert number to price format
        price_float = float(price)
        return f"${price_float:,.0f}"
    except ValueError:
        return price

def process_csv(file_path: str) -> Dict:
    """Process CSV file and convert to structured JSON format."""
    
    # Initialize the structure
    wishlist_data = {
        "groups": []
    }
    
    current_group = None
    current_item = None
    previous_product = None
    
    # First, read the file to get the actual headers
    with open(file_path, 'r', encoding='utf-8') as file:
        # Skip empty lines at the start
        for line in file:
            if line.strip():
                headers = line.strip().split(',')
                break
    
    # Reopen the file to process the data
    with open(file_path, 'r', encoding='utf-8') as file:
        # Skip lines until we get to the actual headers
        for line in file:
            if line.strip() and 'Group' in line:
                break
        
        reader = csv.DictReader(file, fieldnames=['Priority', 'Group', 'Product', 'Model', 'Link', 'Price', 'Notes'])
        
        for row in reader:
            # Skip empty rows
            if all(not value.strip() for value in row.values()):
                continue
            
            # Skip header-like rows
            if row['Group'] == 'Group':
                continue
                
            group = row['Group'].strip() if row['Group'] else ''
            product_type = row['Product'].strip() if row['Product'] else ''
            model = row['Model'].strip() if row['Model'] else ''
            link = row['Link'].strip() if row['Link'] else ''
            price = clean_price(row['Price'].strip() if row['Price'] else '')
            notes = row['Notes'].strip() if row['Notes'] and row['Notes'].strip() else None
            
            # Check if this is a priority item (marked with ★)
            is_priority = bool(row['Priority'] and '★' in row['Priority'])
            
            # Handle new group
            if group:
                current_group = {
                    "name": group,
                    "items": []
                }
                wishlist_data["groups"].append(current_group)
                current_item = None
                previous_product = None
            
            # Handle new product type
            if product_type:
                current_item = {
                    "name": product_type,
                    "priority": is_priority,
                    "products": []
                }
                if current_group:
                    current_group["items"].append(current_item)
                previous_product = None
            
            # Handle product entry
            if model or link or price:
                # Check if this is a continuation of previous product (indicated by ↑)
                if model == '↑' and previous_product:
                    # Add alternative link to previous product
                    previous_product["alternative_links"] = previous_product.get("alternative_links", [])
                    previous_product["alternative_links"].append(link)
                else:
                    # Create new product
                    product = {
                        "model": model,
                        "link": link if link else None,
                        "price": price,
                        "notes": notes
                    }
                    
                    # Remove None values
                    product = {k: v for k, v in product.items() if v is not None}
                    
                    if current_item:
                        current_item["products"].append(product)
                        previous_product = product

    # Clean up the structure
    # Remove empty groups
    wishlist_data["groups"] = [group for group in wishlist_data["groups"] if group["items"]]
    
    # Clean up items
    for group in wishlist_data["groups"]:
        for item in group["items"]:
            # Remove priority field if False
            if not item["priority"]:
                del item["priority"]
            
            # If there's only one product, simplify the structure
            if len(item["products"]) == 1:
                item["products"] = item["products"][0]
    
    return wishlist_data

if __name__ == "__main__":
    # Convert the CSV
    wishlist_data = process_csv("Want - Tj Want.csv")
    
    # Save the JSON with nice formatting
    with open("wishlist.json", "w", encoding="utf-8") as f:
        json.dump(wishlist_data, f, indent=2, ensure_ascii=False)
        
    # Print summary
    print("\nConversion completed! Summary:")
    print(f"Total groups: {len(wishlist_data['groups'])}")
    total_items = sum(len(group['items']) for group in wishlist_data['groups'])
    print(f"Total items: {total_items}")