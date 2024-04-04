const generatePDF = async (name) => {
    const { PDFDocument, rgb } = PDFLib;

    if (!name || name.length < 10) {
        alert("Lütfen geçerli bir isim girin (minimum 10 karakter).");
        return;
    }

    const exBytes = await fetch("./Ticket.pdf").then((res) => {
        return res.arrayBuffer();
    });

    const exFont = await fetch("./FrancoisOne-jYgy.ttf").then((res) => {
        return res.arrayBuffer();
    });

    const pdfDoc = await PDFDocument.load(exBytes);
    pdfDoc.registerFontkit(fontkit);

    const myFont = await pdfDoc.embedFont(exFont);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    firstPage.drawText(name, {
        x: 70,
        y: 125,
        size: 20,
        font: myFont,
        color: rgb(0, 0, 0),
    });

    const uri = await pdfDoc.saveAsBase64({ dataUri: true });
    saveAs(uri, "HatiraBileti.pdf", { autoBom: true });
};

const submitBtn = document.getElementById("submitBtn");
const inputValue = document.querySelector("#name");

submitBtn.addEventListener("click", () => {
    const val = inputValue.value;

    if (val && val.length >= 10) {
        generatePDF(val);
    } else {
        alert("Lütfen geçerli bir isim girin (minimum 10 karakter).");
    }
});
