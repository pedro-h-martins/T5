import { Component } from "react";

type NotificacaoProps = {
    mensagem: string;
    tipo: 'success' | 'error' | 'info';
    onClose: () => void;
}

export default class Notificacao extends Component<NotificacaoProps> {
    componentDidMount() {
        setTimeout(() => {
            this.props.onClose();
        }, 5000);
    }

    render() {
        const { mensagem, tipo } = this.props;

        const bgClass = tipo === 'success' 
            ? 'bg-success' 
            : tipo === 'error' 
                ? 'bg-danger' 
                : 'bg-info';

        return (
            <div className={`position-fixed top-0 end-0 p-3`} style={{ zIndex: 1050 }}>
                <div 
                    className={`toast show ${bgClass} text-white`} 
                    role="alert" 
                    aria-live="assertive" 
                    aria-atomic="true"
                >
                    <div className="toast-header">
                        <strong className="me-auto">Notificação</strong>
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={this.props.onClose}
                        ></button>
                    </div>
                    <div className="toast-body">
                        {mensagem}
                    </div>
                </div>
            </div>
        );
    }
}
