import numpy as np
import pandas as pd
import os
import cv2
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout, BatchNormalization
from tensorflow.keras.regularizers import l2
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

# 📍 Define Paths
DATA_PATH = "/Users/dhruvdawar11/Desktop/KHacks/ocean guard/DATACHECK/oil_spill_pixel_data.csv"

# 📌 Load Data
df = pd.read_csv(DATA_PATH)

# 🔹 Extract features (RGB values)
df[['R', 'G', 'B']] = df['RGB_Color'].str.split(',', expand=True).astype(int)

# 📌 Normalize RGB values (0-255 → 0-1)
df[['R', 'G', 'B']] /= 255.0

# 🔹 Reshape into grid (8x8 image representation per grid)
grid_size = 8  # Try increasing to 16 later
num_grids = df.shape[0] // (grid_size * grid_size)

# 📌 Prepare image dataset
images = []
labels = []

for i in range(num_grids):
    start_idx = i * (grid_size * grid_size)
    end_idx = start_idx + (grid_size * grid_size)
    
    # Extract grid data
    grid_data = df.iloc[start_idx:end_idx][['R', 'G', 'B']].values.reshape(grid_size, grid_size, 3)
    
    # Extract anomaly label (1 = oil spill, 0 = normal water)
    label = df.iloc[start_idx:end_idx]['Anomaly_Grid'].max()
    
    images.append(grid_data)
    labels.append(label)

# Convert lists to NumPy arrays
X = np.array(images)
y = np.array(labels)

# 📌 Train-Test Split (80% Train, 20% Test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

# 🔹 **Data Augmentation**: Helps prevent overfitting
datagen = ImageDataGenerator(
    rotation_range=10,  # Randomly rotate images
    width_shift_range=0.1,  # Horizontally shift
    height_shift_range=0.1,  # Vertically shift
    horizontal_flip=True  # Flip horizontally
)

# 📌 Define CNN Model (Updated)
model = Sequential([
    tf.keras.layers.Input(shape=(8, 8, 3)),  # Explicit input layer
    
    Conv2D(32, (3, 3), activation='relu', padding='same', kernel_regularizer=l2(0.001)),
    BatchNormalization(),  # Normalize activations
    MaxPooling2D((2, 2)),  # Output: (4,4,32)
    Dropout(0.5),  # Increased Dropout

    Conv2D(64, (3, 3), activation='relu', padding='same', kernel_regularizer=l2(0.001)),
    BatchNormalization(),
    MaxPooling2D((2, 2)),  # Output: (2,2,64)
    Dropout(0.5),

    Flatten(),
    Dense(32, activation='relu', kernel_regularizer=l2(0.001)),  # Reduced layer size
    Dropout(0.5),  # Higher Dropout to prevent memorization

    Dense(2, activation='softmax')  # Binary classification
])

# 📌 Compile Model
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# 📌 Early Stopping Callback
early_stopping = tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)

# 📌 Train Model with Data Augmentation
history = model.fit(datagen.flow(X_train, y_train, batch_size=216321),
                    epochs=5,
                    validation_data=(X_test, y_test),
                    callbacks=[early_stopping])

# 📌 Save Model
model.save("/Users/dhruvdawar11/Desktop/KHacks/ocean guard/DATACHECK/oil_spill_detector.h5")

# 📌 Evaluate Model
test_loss, test_acc = model.evaluate(X_test, y_test)
print(f"Test Accuracy: {test_acc:.4f}")

# 📌 Plot Training Performance
plt.figure(figsize=(10, 5))
plt.plot(history.history['accuracy'], label='Train Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.xlabel("Epochs")
plt.ylabel("Accuracy")
plt.legend()
plt.title("Training vs Validation Accuracy")
plt.show()
