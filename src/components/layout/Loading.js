import loading from '../../images/loading.svg';

import styles from './Loading.module.css';
function Loading() {
    return (
        <div className={styles.loaderContainer}>
            <img className={styles.loader} src={loading} alt="Imagem de carregamento de pagina" />
        </div>
    );
}

export default Loading;