import { UserCircle } from 'phosphor-react'
import { ImgHTMLAttributes } from 'react'
import styles from './Avatar.module.css'
interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean
  hasImage?: boolean
}

export function Avatar({ hasBorder = true, hasImage, ...props }: AvatarProps) {
  if (hasImage) {
    return (
      <img
        className={hasBorder ? styles.avatarWithBorder : styles.avatar}
        {...props}
        alt=""
      />
    )
  } else {
    return <UserCircle className={styles.avatarSvg} />
  }
}
