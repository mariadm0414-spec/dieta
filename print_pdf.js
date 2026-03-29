const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();

        // Set a good viewport and go to the local server
        await page.setViewport({ width: 1200, height: 1600 });
        await page.goto('http://localhost:3000/ebook.html', { waitUntil: 'networkidle0' });

        // Inject CSS to hide the print button
        await page.addStyleTag({ content: '.no-print { display: none !important; }' });

        // Generate PDF
        await page.pdf({
            path: 'El_Metodo_Invisible.pdf',
            format: 'A4',
            printBackground: true,
            margin: { top: '0', right: '0', bottom: '0', left: '0' }
        });

        await browser.close();
        console.log('PDF generated at El_Metodo_Invisible.pdf');
    } catch (err) {
        console.error('Error generating PDF:', err);
    }
})();
