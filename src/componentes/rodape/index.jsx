import Image from 'next/image';
import Link from 'next/link';

import styles from './index.module.css';

// import facebook from '../../../public/icones/facebook.svg'
// import telegram from '../../../public/icones/telegram.svg'
// import whatsapp from '../../../public/icones/whatsapp.svg'
// import tiktok from '../../../public/icones/tiktok.svg'

export default function Rodape() {
    return (
        <footer className={styles.rodape}>
            <div className={styles.social}>
                <Link href="https://www.facebook.com/" target="_blank">
                    <Image src="/icones/facebook.svg" alt="facebook" width={20} height={20} className={styles.icone} />
                </Link>
                <Link href="https://web.telegram.org/" target="_blank">
                <Image src="/icones/telegram.svg" alt="telegram" width={20} height={20} className={styles.icone} />
                </Link>
                <Link href="https://www.whatsapp.com/?lang=pt_BR" target="_blank">
                <Image src="/icones/whatsapp.svg" alt="whatsapp" width={20} height={20} className={styles.icone} />
                </Link>
                <Link href="https://www.tiktok.com/pt-BR/" target="_blank">
                <Image src="/icones/tiktok.svg" alt="tiktok" width={20} height={20} className={styles.icone} />
                </Link>
            </div>
            <p>Lanches BomNurguer de Cidade ME | 00.000.000/0000-00</p>
            <p>Rua Brasil, 1000 - centro - Parapuã/SP | bbgr@bbuguer.com</p>
        </footer>
    );
}