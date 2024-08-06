from moviepy.editor import VideoFileClip
from PIL import Image
import numpy as np
import moviepy.video.fx.resize as resize_fx

# Monkey-patch moviepy to use Image.LANCZOS instead of Image.ANTIALIAS and ensure newsize is in integers
def custom_resizer(pic, newsize):
    pil_image = Image.fromarray(pic.astype('uint8'))
    resized_pil = pil_image.resize((int(newsize[1]), int(newsize[0])), Image.LANCZOS)
    return np.array(resized_pil)

resize_fx.resizer = custom_resizer

def convert_mov_to_gif(input_file, output_file, start_time=None, end_time=None, resize_ratio=None):
    # Load the .mov file
    clip = VideoFileClip(input_file)
    
    # Optionally trim the video
    if start_time is not None and end_time is not None:
        clip = clip.subclip(start_time, end_time)
    
    # Optionally resize the video
    if resize_ratio is not None:
        clip = clip.resize(resize_ratio)
    
    # Write the video to a .gif file
    clip.write_gif(output_file, fps=15)

# Example usage
input_file = '/Users/Anton/Programming/gif_convert/Untitled Project 2.mov'
output_file = 'output_file.gif'
convert_mov_to_gif(input_file, output_file, start_time=0, end_time=10, resize_ratio=0.5)
