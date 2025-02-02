import numpy as np
import pandas as pd
import random
from datetime import datetime, timedelta

# User input: Number of grids (N)
N = int(input("Enter the number of grids: "))

# Grid settings (8x8 grid per map)
grid_size = 8  # Each grid has 8x8 points
num_pixels = grid_size * grid_size  # Total pixels per grid

# Define anomaly ratio (30% of pixels in each grid)
anomaly_ratio = 0.3
num_anomaly_pixels = int(num_pixels * anomaly_ratio)

# Generate timestamps
start_date = datetime.now() - timedelta(days=365)

def random_timestamp():
    """Generate a random timestamp within the last year."""
    return start_date + timedelta(days=random.uniform(0, 365))

# Define pixel quality options
pixel_quality_options = ["High", "Medium", "Low"]

def generate_grid(lat, lon):
    """Generate a dataset for a single grid centered at (lat, lon)."""
    # Create equally spaced latitude and longitude points
    latitudes = np.linspace(lat - 0.5, lat + 0.5, grid_size)
    longitudes = np.linspace(lon - 0.5, lon + 0.5, grid_size)

    grid_points = [(lat, lon) for lat in latitudes for lon in longitudes]
    random.shuffle(grid_points)  # Shuffle to randomize anomaly placement

    # Separate normal and anomaly pixels
    anomaly_pixels = set(grid_points[:num_anomaly_pixels])
    normal_pixels = set(grid_points[num_anomaly_pixels:])

    # Set grid anomaly flag
    grid_anomaly_flag = 1 if anomaly_pixels else 0

    # Data collection
    data = []

    # Process normal pixels (Blue - Water)
    for lat, lon in normal_pixels:
        data.append([lat, lon, random_timestamp(), "0,0,255", 0, random.choice(pixel_quality_options), 0])

    # Process anomaly pixels (Oil Spill)
    for center_lat, center_lon in anomaly_pixels:
        for dx in [-0.2, -0.1, 0, 0.1, 0.2]:
            for dy in [-0.2, -0.1, 0, 0.1, 0.2]:
                lat, lon = center_lat + dx, center_lon + dy

                # Assign color based on distance from center
                distance = max(abs(dx), abs(dy))
                if distance <= 0.05:
                    color = random.choice(["255,69,0", "255,140,0", "255,0,0"])  # Deep Red / Orange
                elif distance <= 0.1:
                    color = "255,165,0"  # Light Orange
                elif distance <= 0.2:
                    color = "255,255,0"  # Yellow
                else:
                    color = "0,0,255"  # Water

                data.append([lat, lon, random_timestamp(), color, 1, random.choice(pixel_quality_options), 1])

    return data, grid_anomaly_flag

# Generate dataset for N grids
dataset = []
grid_data = []

# Define random starting points for grids (centered around oceans)
base_latitudes = np.linspace(-30, 30, N)
base_longitudes = np.linspace(-60, 60, N)

for lat, lon in zip(base_latitudes, base_longitudes):
    grid_entries, anomaly_flag = generate_grid(lat, lon)
    dataset.extend(grid_entries)
    grid_data.append([lat, lon, anomaly_flag])

# Convert datasets to DataFrames
df_pixels = pd.DataFrame(dataset, columns=[
    "Latitude", "Longitude", "Time", "RGB_Color", "Anomaly_Pixel", "Pixel_Quality", "Anomaly_Grid"
])
df_grids = pd.DataFrame(grid_data, columns=["Grid_Latitude", "Grid_Longitude", "Anomaly_Flag"])

# Define file paths to save CSVs in the specified directory
output_directory = "/Users/dhruvdawar11/Desktop/KHacks/ocean guard/DATACHECK"

pixel_file_path = f"{output_directory}/oil_spill_pixel_data.csv"
grid_file_path = f"{output_directory}/oil_spill_grid_data.csv"

# Save CSV files in the specified directory
df_pixels.to_csv(pixel_file_path, index=False)
df_grids.to_csv(grid_file_path, index=False)

# Print confirmation message with exact file locations
print(f"Pixel data saved to: {pixel_file_path}")
print(f"Grid data saved to: {grid_file_path}")