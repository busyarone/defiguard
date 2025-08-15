import React, { useEffect, useState, useRef } from "react";

import "./index.css";

import Header from "../../components/header";
import BlogSection from "../../components/blog";
import Footer from "../../components/footer";

function Wallet() {
	return (
		<div>
			<div className="header_section">
				<Header />
			</div>
			<BlogSection />
			<Footer />
		</div>
	);
}


export default Wallet;