// Image selection for upload
document.getElementById('file-select').addEventListener('click', () => {
    document.getElementById('file-input').click();
});

document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('preview').src = e.target.result;
            document.getElementById('preview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Image background removal process
document.getElementById('process-btn').addEventListener('click', async function() {
    const file = document.getElementById('file-input').files[0];
    if (!file) return alert("Please upload an image first.");

    document.getElementById('loading').style.display = 'block';

    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('size', 'auto');  // Automatically fit the image size

    try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: { 
                'X-Api-Key': 'ZJaJDGknHEKkfNwMcYMwErpU'  // API Key for remove.bg
            },
            body: formData
        });

        if (response.ok) {
            const resultBlob = await response.blob();
            const resultURL = URL.createObjectURL(resultBlob);
            
            // Set images
            document.getElementById('processed').src = resultURL;
            document.getElementById('original').src = URL.createObjectURL(file);
            document.getElementById('download-btn').href = resultURL;

            // Show result section
            document.getElementById('results').style.display = 'block';
        } else {
            alert("Something went wrong!");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Error in processing your image.");
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
});

// Change background color
document.getElementById('change-bg-btn').addEventListener('click', () => {
    const colorPickerContainer = document.getElementById('color-picker-container');
    colorPickerContainer.style.display = colorPickerContainer.style.display === 'none' ? 'block' : 'none';
});

// Apply selected color as background color
document.getElementById('bg-color').addEventListener('input', function() {
    document.getElementById('processed').style.backgroundColor = this.value;
});

// Edit another photo - reset everything for new photo
document.getElementById('edit-another-btn').addEventListener('click', function() {
    document.getElementById('file-input').value = '';  // Reset file input
    document.getElementById('preview').style.display = 'none';  // Hide preview
    document.getElementById('results').style.display = 'none';  // Hide results
    document.getElementById('color-picker-container').style.display = 'none';  // Hide color picker
    document.getElementById('processed').style.backgroundColor = '';  // Reset background color
    document.getElementById('file-input').click();  // Trigger file input click
});
