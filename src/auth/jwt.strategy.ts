import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from "./jwt.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

  constructor(configService: ConfigService){
    const secretJWTKey = configService.get<string>('JWT_SECRET');
    if(!secretJWTKey) throw Error('JWT_SECRET no registrado');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretJWTKey,
      ignoreExpiration: false,
    })
  }
  
  validate(payload: JwtPayload) {
    const { sub } = payload;
    return { sub };
  }
}