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
    tipoCheckListId: number;
}

export interface UsuarioLogadoDTO {
  usuarioId: number;
  usuarioNomeCompleto: string;
}

export interface PerfilDTO {
   perfilId: number;
   perfilNome: string;
   perfilStatus: boolean;
}

export interface PermissaoDTO {
     permissaoId: number; 
     permissaoNome: string;
     permissaoStatus: boolean;
}

export interface PerfilPermissaoDTO {
    perfilId: number;
    permissaoId: number;
}