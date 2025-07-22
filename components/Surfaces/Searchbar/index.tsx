'use client'
import type React from 'react'
import { useCallback, useState } from 'react'
import { ProfilePicture } from '@/components/Display/Avatar'
import { BellIcon } from '@/components/Display/Icons/Bell'
import { SidebarIcon } from '@/components/Display/Icons/Sidebar'
import { Logo } from '@/components/Display/Logo'
import { NavAction } from '@/components/Inputs/Button/NavAction'
import { MenuCard } from '@/components/Navigation/MenuCard'
import { MenuNotifications } from '@/components/Template/MenuNotifications'
import { MenuSettings } from '@/components/Template/MenuSettings'
import useSidebar from '@/lib/context/global'

enum SearchbarCards {
  Settings,
  Notifications,
  Default,
}

const Searchbar: React.FC = () => {
  const [isCardOpen, setCardOpen] = useState(SearchbarCards.Default)
  const toggleSidebarVisibility = useSidebar(
    state => state.toggleSidebarVisibility
  )

  const handleClickOverlay = useCallback(() => {
    setCardOpen(SearchbarCards.Default)
  }, [])

  const handleSettingsClick = useCallback(() => {
    setCardOpen(
      isCardOpen === SearchbarCards.Settings
        ? SearchbarCards.Default
        : SearchbarCards.Settings
    )
  }, [isCardOpen])

  const handleNotificationsClick = useCallback(() => {
    setCardOpen(
      isCardOpen === SearchbarCards.Notifications
        ? SearchbarCards.Default
        : SearchbarCards.Notifications
    )
  }, [isCardOpen])

  return (
    <div className='h-[calc(50px+(env(safe-area-inset-top)))] min-h-[calc(50px+(env(safe-area-inset-top)))] pt-[calc(env(safe-area-inset-top))] flex justify-between items-center col-span-full bg-[--backgroundSecondary] px-3 sm:pt-0 w-full sm:w-auto lg:h-[50px]'>
      <div className='flex items-center gap-3'>
        <NavAction
          type='button'
          desktop={true}
          icon={
            <SidebarIcon
              size='size-5'
              stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
            />
          }
          mobile={true}
          action={toggleSidebarVisibility}
        />

        <Logo width={70} />
      </div>

      <div className='flex items-center gap-3'>
        <div className='relative'>
          <NavAction
            type='button'
            desktop={true}
            icon={
              <BellIcon
                size='size-5'
                stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
              />
            }
            mobile={true}
            action={handleNotificationsClick}
          />

          <MenuCard
            handleClickOverlay={handleClickOverlay}
            isMenuOpen={isCardOpen === SearchbarCards.Notifications}
            margin='mt-[115%]'
            width='min-w-72'
            zIndex='z-[60]'
          >
            <MenuNotifications />
          </MenuCard>
        </div>

        {/* <div className='relative'>
          <NavAction
            type='button'
            desktop={true}
            icon={
              <GearSix
                size={18}
                weight='fill'
                className='text-[--textSecondary] group-data-[active=true]:text-[--primaryColor]'
              />
            }
            mobile={true}
            action={handleSettingsClick}
          />

          <MenuCard
            handleClickOverlay={handleClickOverlay}
            isMenuOpen={isCardOpen === SearchbarCards.Settings}
            margin='mt-[115%]'
            width='min-w-72'
            zIndex='z-[60]'
          >
            <MenuSettings />
          </MenuCard>
        </div> */}

        <div className='relative'>
          <button onClick={handleSettingsClick} type='button'>
            <ProfilePicture />
          </button>

          <MenuCard
            handleClickOverlay={handleClickOverlay}
            isMenuOpen={isCardOpen === SearchbarCards.Settings}
            margin='mt-[115%]'
            width='min-w-72'
            zIndex='z-[60]'
          >
            <MenuSettings />
          </MenuCard>
        </div>
      </div>
    </div>
  )
}

export default Searchbar
