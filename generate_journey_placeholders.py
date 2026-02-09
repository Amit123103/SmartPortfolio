"""
Generate placeholder images for Journey section
"""
from PIL import Image, ImageDraw, ImageFont
import os

# Create output directory
output_dir = r"d:\Projects\portfolio\src\assets\journey"
os.makedirs(output_dir, exist_ok=True)

# Journey milestones
milestones = [
    {
        "year": "2021",
        "title": "The Beginning",
        "filename": "journey_2021.png",
        "color": (70, 130, 180)  # Steel Blue
    },
    {
        "year": "2022",
        "title": "Learning Foundations",
        "filename": "journey_2022.png",
        "color": (100, 149, 237)  # Cornflower Blue
    },
    {
        "year": "2023",
        "title": "Exploring Web & AI",
        "filename": "journey_2023.png",
        "color": (123, 104, 238)  # Medium Slate Blue
    },
    {
        "year": "2024",
        "title": "Building Real Projects",
        "filename": "journey_2024.png",
        "color": (138, 43, 226)  # Blue Violet
    },
    {
        "year": "2025",
        "title": "Growing & Innovating",
        "filename": "journey_2025.png",
        "color": (148, 0, 211)  # Dark Violet
    }
]

width, height = 800, 600

for item in milestones:
    # Create gradient background
    img = Image.new('RGB', (width, height), color=(20, 20, 30))
    draw = ImageDraw.Draw(img)
    
    # Draw gradient
    for i in range(height):
        ratio = i / height
        r = int(20 * (1 - ratio) + item["color"][0] * ratio * 0.5)
        g = int(20 * (1 - ratio) + item["color"][1] * ratio * 0.5)
        b = int(30 * (1 - ratio) + item["color"][2] * ratio * 0.5)
        draw.line([(0, i), (width, i)], fill=(r, g, b))

    # Load font
    try:
        font_year = ImageFont.truetype("arial.ttf", 100)
        font_title = ImageFont.truetype("arial.ttf", 50)
    except:
        font_year = ImageFont.load_default()
        font_title = ImageFont.load_default()

    # Draw Year
    year_text = item["year"]
    bbox = draw.textbbox((0, 0), year_text, font=font_year)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    draw.text(((width - w) / 2, (height - h) / 2 - 50), year_text, fill=(255, 255, 255), font=font_year)

    # Draw Title
    title_text = item["title"]
    bbox = draw.textbbox((0, 0), title_text, font=font_title)
    w = bbox[2] - bbox[0]
    draw.text(((width - w) / 2, (height) / 2 + 80), title_text, fill=(200, 200, 200), font=font_title)

    # Save
    output_path = os.path.join(output_dir, item["filename"])
    img.save(output_path)
    print(f"Created {output_path}")

print("Done!")
