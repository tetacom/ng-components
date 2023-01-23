import {ChangeDetectionStrategy, Component, HostBinding, Input, OnInit} from '@angular/core';
import {AvatarColorEnum} from '../model/avatar-color.enum';

@Component({
  selector: 'teta-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent implements OnInit {
  @Input() photo?: string | ArrayBuffer;
  @Input() name?: string;
  @Input() id?: number = 0;
  @Input() viewType?: 'circle' | 'rounded' | 'brick' = 'circle';
  @Input() size?: '24' | '28' | '32' | '44' | '64' | '128' | '200' = '28';

  @HostBinding('class') get avatar() {
    let avatar = 'avatar ';
    avatar += 'avatar-size-' + this.size;
    return avatar;
  }

  public colorMap: Map<AvatarColorEnum, string> = new Map<
    AvatarColorEnum,
    string
  >()
    .set(AvatarColorEnum.vibrant, '#FAB13C')
    .set(AvatarColorEnum.pumpkin, '#F67A1A')
    .set(AvatarColorEnum.heart, '#CC3E3E')
    .set(AvatarColorEnum.cerise, '#EB3673')
    .set(AvatarColorEnum.nebula, '#9121A3')
    .set(AvatarColorEnum.vanity, '#9C2AD6')
    .set(AvatarColorEnum.gloomy, '#855EE1')
    .set(AvatarColorEnum.iris, '#5350D1')
    .set(AvatarColorEnum.gorgonzola, '#3858DA')
    .set(AvatarColorEnum.navy, '#1F7CE0')
    .set(AvatarColorEnum.rockman, '#3AA2F4')
    .set(AvatarColorEnum.caribbean, '#1CC3D9')
    .set(AvatarColorEnum.lagoon, '#1D96AE')
    .set(AvatarColorEnum.turquoise, '#1F9D8C')
    .set(AvatarColorEnum.hair, '#1EAE66')
    .set(AvatarColorEnum.poisonous, '#33C333')
    .set(AvatarColorEnum.lime, '#80C026')
    .set(AvatarColorEnum.greyish, '#7F8697');

  constructor() {
  }

  ngOnInit(): void {
  }
}
