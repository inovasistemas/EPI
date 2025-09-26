import type { Metadata } from 'next'

export function pageMetadata(title: string, locked: boolean = false): Metadata {
  return {
    title: `${title} | Inova Sistemas`,
    description: '',
    icons: {
        icon: locked ? '/lock.ico' : '/unlock.ico',
      },
  }
}
