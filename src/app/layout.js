// import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/services/redux/StoreProvider";
// const inter = Inter({ subsets: ["latin"] });

import Cabecalho from "@/componentes/cabecalho";
import Rodape from "@/componentes/rodape";

export const metadata = {
  title: "BomBurguer",
  description: "Lanches e petiscos de qualidade",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      {/* <body className={inter.className}>{children}</body> */}
      <body suppressHydrationWarning={true}>
        {/* <div className="layout">   */}
        <Providers>
          <Cabecalho />
            {children}
          <Rodape />
        </Providers>
        {/* </div> */}
      </body>
    </html>
  );
}
