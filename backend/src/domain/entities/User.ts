export class User {
  public readonly id?: number;

  constructor(
    public name: string,
    public email: string,
    public passwordHash: string,
    public role: 'admin' | 'kitchen' | 'customer',
    id?: number // opcional, pois só existe após salvar no banco
  ) {
    if (!email.includes('@')) throw new Error('Email inválido');
    if (name.length < 3) throw new Error('Nome muito curto');

    if (id) this.id = id;
  }

  toJSON() {
    const { passwordHash, ...rest } = this;
    return rest;
  }
}