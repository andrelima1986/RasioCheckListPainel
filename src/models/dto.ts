export interface ResponseDTO<T> {
  sucesso: boolean;
  mensagem: string;
  dados: T | null;
}

export interface UsuarioDTO {
    usuarioId: number;
    usuarioNomeCompleto: string;
    usuarioCPF: string;
    usuarioEmail: string;
    usuarioSenha: string;
    usuarioStatus: string;
}