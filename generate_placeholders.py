"""
Generate placeholder images for portfolio projects
This script creates simple colored placeholder images for each project
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Create output directory
output_dir = r"d:\Projects\portfolio\src\assets\projects"
os.makedirs(output_dir, exist_ok=True)

# Project configurations
projects = [
    {
        "filename": "face_recognition_attendance.png",
        "title": "Face Recognition\nAttendance System",
        "color": (30, 144, 255)  # Blue
    },
    {
        "filename": "driver_drowsiness_detection.png",
        "title": "Driver Drowsiness\nDetection System",
        "color": (255, 69, 0)  # Red-Orange
    },
    {
        "filename": "smart_portfolio.png",
        "title": "Smart Portfolio\nWebsite",
        "color": (138, 43, 226)  # Purple
    },
    {
        "filename": "music_playlist.png",
        "title": "Music Playlist\nApplication",
        "color": (255, 20, 147)  # Pink
    },
    {
        "filename": "livestock_management.png",
        "title": "Livestock Management\nSystem",
        "color": (34, 139, 34)  # Green
    },
    {
        "filename": "emotion_detection.png",
        "title": "Emotion Detection\nSystem",
        "color": (255, 165, 0)  # Orange
    },
    {
        "filename": "hand_detection_drawing.png",
        "title": "Hand Detection\nDrawing",
        "color": (0, 191, 255)  # Cyan
    }
]

# Image dimensions
width, height = 1200, 800

for project in projects:
    # Create image with gradient background
    img = Image.new('RGB', (width, height), color=(26, 26, 26))
    draw = ImageDraw.Draw(img)
    
    # Create gradient effect
    for i in range(height):
        opacity = int(255 * (1 - i / height) * 0.3)
        color = tuple(int(c * opacity / 255) for c in project['color'])
        draw.rectangle([(0, i), (width, i + 1)], fill=color)
    
    # Add centered text
    try:
        # Try to use a nice font
        font_large = ImageFont.truetype("arial.ttf", 60)
        font_small = ImageFont.truetype("arial.ttf", 24)
    except:
        # Fallback to default font
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    # Draw title
    title_bbox = draw.textbbox((0, 0), project['title'], font=font_large)
    title_width = title_bbox[2] - title_bbox[0]
    title_height = title_bbox[3] - title_bbox[1]
    title_x = (width - title_width) // 2
    title_y = (height - title_height) // 2 - 50
    
    # Add shadow
    draw.text((title_x + 3, title_y + 3), project['title'], fill=(0, 0, 0, 128), font=font_large)
    # Add main text
    draw.text((title_x, title_y), project['title'], fill=(255, 255, 255), font=font_large)
    
    # Add subtitle
    subtitle = "Portfolio Project"
    subtitle_bbox = draw.textbbox((0, 0), subtitle, font=font_small)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    subtitle_x = (width - subtitle_width) // 2
    subtitle_y = title_y + title_height + 30
    draw.text((subtitle_x, subtitle_y), subtitle, fill=(180, 180, 180), font=font_small)
    
    # Add decorative elements
    accent_color = project['color']
    draw.rectangle([(50, height - 100), (width - 50, height - 95)], fill=accent_color)
    
    # Save image
    output_path = os.path.join(output_dir, project['filename'])
    img.save(output_path, 'PNG', quality=95)
    print(f"Created: {output_path}")

print("\n✅ All placeholder images created successfully!")
print(f"📁 Location: {output_dir}")
print("\n💡 Next steps:")
print("1. Replace these placeholders with actual project screenshots")
print("2. Use the image_specifications.md guide for details")
print("3. Recommended tools: DALL-E, Midjourney, or Figma")
