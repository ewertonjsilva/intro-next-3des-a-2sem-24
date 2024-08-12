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
                <Link href="https://www.facebook.com/"  className={styles.linkTemp} target="_blank">
                    <Image src="/icones/facebook.svg" alt="facebook" width={20} height={20} className={styles.icone} />
                </Link>
                <Image src="/icones/telegram.svg" alt="telegram" width={20} height={20} className={styles.icone} />
                <Image src="/icones/whatsapp.svg" alt="whatsapp" width={20} height={20} className={styles.icone} />
                <Image src="/icones/tiktok.svg" alt="tiktok" width={20} height={20} className={styles.icone} />
            </div>
            <p>Lanches BomNurguer de Cidade ME | 00.000.000/0000-00</p>
            <p>Rua Brasil, 1000 - centro - Parapuã/SP | bbgr@bbuguer.com</p>
        </footer>
    );
}