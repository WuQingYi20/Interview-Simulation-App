const Tesseract = require('tesseract.js');
const path = require('path');
const fs = require('fs');
const { convert } = require('pdf-poppler');
const { Poppler } = require("node-poppler");

const pdfToImages = async (pdfPath) => {
    const poppler = new Poppler();
    const options = {
        pngFile: true,
    };
    const outputFile = path.join(path.dirname(pdfPath), 'output_page');
    await poppler.pdfToCairo(pdfPath, outputFile, options);

    // Dynamically generate the list of image paths
    let imagePaths = [];
    let pageIndex = 1;
    while (fs.existsSync(`${outputFile}-${pageIndex}.png`)) {
        imagePaths.push(`${outputFile}-${pageIndex}.png`);
        pageIndex++;
    }

    return imagePaths;
};



/**
 * Function to perform OCR on a given PDF file.
 * @param {string} pdfPath - The path to the PDF file.
 * @returns {Promise<string>} - The extracted text.
 */
const performOCR = async (pdfPath) => {
    try {
        console.log("Running OCR function...");

        // Convert PDF to images
        const imagePaths = await pdfToImages(pdfPath);

        console.log("Image paths:", imagePaths);

        if (!imagePaths || imagePaths.length === 0) {
            console.log("No images generated from PDF.");
            return;
        }

        // Perform OCR on each image
        let fullText = '';
        for (const imagePath of imagePaths) {
            console.log(`Analyzing image: ${imagePath}`);

            const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');

            console.log(`Extracted text from ${imagePath}:`, text);

            fullText += text;

            fs.unlinkSync(imagePath); // Delete the image file
        }

        return fullText;

    } catch (error) {
        console.error(`OCR Error: ${error.message}`);
        throw error;
    }
};


module.exports = {
    performOCR,
};
