"use client";
import { QRCodeCanvas } from "qrcode.react";
import { FaUpload } from "react-icons/fa";
import { useState, useRef } from "react";

export default function Home() {
    const [linkValue, setLinkValue] = useState<string>("");
    const [bgColor, setBgColor] = useState<string>("#FFFFFF");
    const [fgColor, setFgColor] = useState<string>("#000000");
    const [logoUrl, setLogoUrl] = useState<string>("logo-react.png");
    const [logoSize, setLogoSize] = useState<number>(32);
    const qrCodeRef = useRef<HTMLDivElement>(null);

    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleQrCodeDownload = () => {
        const canvas = qrCodeRef.current?.querySelector("canvas");
        if (canvas) {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "qr-code.png";
            link.click();
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#DBEAFE] to-[#ADD0FF] gap-8 px-4 md:px-0">
            <section className="title-container relative flex flex-col items-center ">
                <h1 className="page-title font-semibold text-center text-[32px] leading-tight">
                    Gere e customize QR Codes
                    <span className="text-[#4F46E5]"> dinâmicos</span>
                </h1>
                <img
                    src="/arrow.svg"
                    alt="detail"
                    className="absolute -right-[90px] h-[130px] top-[10px] -rotate-[10deg] z-20 hidden md:block"
                />
            </section>
            <section
                className="qr-code-container flex flex-col md:flex-row gap-3 w-full md:w-[700px] p-3 bg-white/20 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg">
                <div className="qr-code flex flex-col gap-[10px] w-full md:w-1/2 p-4 bg-white/30 rounded-lg">
                    <div className=" link-input flex flex-col gap-0.5">
                        <label htmlFor="link" className="font-semibold">
                            Digite seu link
                        </label>
                        <input
                            type="text"
                            id="link"
                            placeholder=" https://exemplo.com"
                            className="p-2.5 rounded-lg border border-[#E2E8F0] focus:outline focus:outline-[#4F46E5]"
                            value={linkValue}
                            onChange={(e) => setLinkValue(e.target.value)}
                        />
                    </div>
                    <div className="qr-code-preview flex flex-col items-center gap-3">
                        <p>QR Code Preview</p>
                        <div ref={qrCodeRef} className="qr-code-canvas">
                        <QRCodeCanvas
                            value={linkValue}
                            title={linkValue}
                            size={200}
                            bgColor={bgColor}
                            fgColor={fgColor}
                            imageSettings={{
                                src:  logoUrl,
                                x: undefined,
                                y: undefined,
                                height: logoSize,
                                width: logoSize,
                                opacity: 1,
                                excavate: true,
                                crossOrigin: "anonymous"
                            }}
                        />
                        </div>
                    </div>
                </div>
                <div className="qr-code-customization flex flex-col justify-between gap-3 w-full md:w-1/2 p-4 bg-white/30 rounded-lg">
                    <div className="customization-container">
                        <h2 className="">Personalize seu QR Code</h2>
                        {/* <p>Escolha as cores, adicione um logo e muito mais!</p> */}
                        <div className="input-container colors flex flex-row gap-8">
                            <div className="input-box">
                                <label htmlFor="bgColor">Cor de fundo</label>
                                <input
                                    type="color"
                                    className="input-color"
                                    id="bgColor"
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                />
                            </div>
                            <div className="input-box">
                                <label htmlFor="fgColor">Cor do QR Code</label>
                                <input
                                    type="color"
                                    className="input-color"
                                    id="fgColor"
                                    value={fgColor}
                                    onChange={(e) => setFgColor(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="customization-container">
                        <h2>Logo</h2>
                        <div className="input-container flex flex-col gap-3.5">
                            <div className="input-box">
                                <label htmlFor="logo">Insira seu logo</label>
                                <input
                                    type="file"
                                    className="input-file"
                                    id="logo"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                />
                                <button className="input-file-button relative z-1 bg-[#4F46E5] rounded-lg border-none px-3 py-2 text-white flex gap-1 items-center justify-center cursor-pointer text-sm w-full">
                                    <FaUpload />
                                    Escolher arquivo
                                </button>
                            </div>
                            <div className="input-box">
                                <label htmlFor="logoSize">
                                    Tamanho do logo
                                </label>
                                <select
                                    className=" px-3 py-2 appearance-none bg-[url('/chevron-down.svg')] bg-no-repeat bg-[right_12px_center] bg-[length:18px] bg-white/70 border border-purple-200 rounded-lg focus:outline-purple-500"
                                    name="logoSize"
                                    id="logoSize"
                                    value={logoSize}
                                    onChange={(e) => setLogoSize(Number(e.target.value))}>

                                    <option value="24">24px</option>
                                    <option value="32">32px</option>
                                    <option value="48">48px</option>
                                    <option value="64">64px</option>
                                    <option value="80">80px</option>
                                    <option value="96">96px</option>
                                    <option value="112">112px</option>
                                    <option value="128">128px</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button className="download-button bg-[#4F46E5] text-white px-6 py-3 rounded-lg font-semibold border-none cursor-pointer hover:bg-[#4338CA] transition-colors duration-200"
                    onClick={handleQrCodeDownload}>
                        Baixar QR Code
                    </button>
                </div>
            </section>
        </main>
    );
}
