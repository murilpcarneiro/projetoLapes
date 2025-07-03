import { generateAccessToken, verifyRefreshToken } from 'utils/jwt';

interface RefreshTokenInput {
  refreshToken: string;
}

interface RefreshTokenResponse {
  accessToken: string;
}

export class RefreshToken {
  async execute({ refreshToken }: RefreshTokenInput): Promise<RefreshTokenResponse> {
    try {
      const payload = verifyRefreshToken(refreshToken) as { id: number; role: string };

      const newAccessToken = generateAccessToken({
        id: payload.id,
        role: payload.role,
      });

      return { accessToken: newAccessToken };
    } catch (err) {
      throw new Error('Refresh token inválido ou expirado');
    }
  }
}