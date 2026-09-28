import React from "react";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-[#EBE4D8] bg-[#FDFBF7] px-6 py-5 text-center font-['Inter','Segoe_UI',sans-serif] text-sm text-[#8C7662]">
            Copyright reserved by Budget-Buddy @{year}
        </footer>
    );
};

export default Footer;