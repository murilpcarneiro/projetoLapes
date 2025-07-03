export class User {
  public readonly id?: number;
  
  constructor(
    public name: string,
    public email: string,
    public passwordHash: string,
    public role: 'admin' | 'kitchen' | 'customer',
    id?: number
  ) {
    if (!email.includes('@')) throw new Error('Email inválido');
    if (name.length < 3) throw new Error('Nome muito curto');
    if (id) this.id = id;
  }
  toJSON(): { id?: number; name: string; email: string; role: string } {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
    };
  }
}