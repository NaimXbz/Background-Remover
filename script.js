document.getElementById('change-bg-btn').addEventListener('click', function() {
    const selectedColor = document.getElementById('bg-color').value;
    
    // Change the background color of the processed image container only
    const processedImage = document.getElementById('processed');
    processedImage.style.backgroundColor = selectedColor;
});

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

document.getElementById('process-btn').addEventListener('click', async function() {
    const file = document.getElementById('file-input').files[0];
    if (!file) return alert("Please upload an image first.");

    document.getElementById('loading').style.display = 'block';

    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('size', 'auto');

    try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: { 'X-Api-Key': 'ZJaJDGknHEKkfNwMcYMwErpU' },
            body: formData
        });
        const resultBlob = await response.blob();
        const resultURL = URL.createObjectURL(resultBlob);

        document.getElementById('processed').src = resultURL;
        document.getElementById('original').src = URL.createObjectURL(file);
        document.getElementById('download-btn').href = resultURL;

        document.getElementById('results').style.display = 'block';
    } catch (error) {
        alert('Error processing image!');
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
});
