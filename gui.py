# from PIL import Image, ImageTk
import cv2
import numpy as np
import torch

# Load the model
model = torch.load('mode.pt', map_location=torch.device('cpu'))  # Load model to CPU
model.eval()

def process_image(image_path):
    """Process the image using the model without tensors."""
    # Load image using OpenCV
    img = cv2.imread(image_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  # Convert BGR to RGB
    
    # Resize the image (if needed) to match the model's expected input size
    input_size = (640, 640)  # Example: Change based on your model's input size
    img_resized = cv2.resize(img, input_size)

    # Normalize the image (if required by the model)
    img_normalized = img_resized / 255.0  # Scale to [0, 1]
    img_normalized = np.expand_dims(img_normalized, axis=0)  # Add batch dimension

    # Process with the model
    with torch.no_grad():
        output = model(torch.from_numpy(img_normalized).permute(0, 3, 1, 2).float())  # Adjust dimensions for model
        output = output.squeeze(0).permute(1, 2, 0).numpy()  # Convert back to NumPy
        output = (output * 255).astype(np.uint8)  # Scale to [0, 255]
    
    return output

resultimg = process_image("lion.jpg")

cv2.imshow(resultimg)

