'use client'
import Image from 'next/image'
import Logotype from '@/public/img/logo@light.png'
import React, { useCallback, useState } from 'react'
import useSidebar from '@/lib/context/global'
import { MenuCard } from '@/components/Navigation/MenuCard'
import { MenuNotifications } from '@/components/Template/MenuNotifications'
import { MenuSettings } from '@/components/Template/MenuSettings'
import { NavAction } from '@/components/Inputs/Button/NavAction'
import { ProfilePicture } from '@/components/Display/Avatar'
import {
  SidebarSimple,
  Gear,
  Bell,
  CalendarDots,
  HandPointing,
  ArrowsOut,
  ArrowsOutSimple,
  FrameCorners,
  Monitor,
} from '@phosphor-icons/react'
import { Logo } from '@/components/Display/Logo'
import { SidebarIcon } from '@/components/Display/Icons/Sidebar'
import { BellIcon } from '@/components/Display/Icons/Bell'
import { SettingIcon } from '@/components/Display/Icons/Setting'
import { NotificationIcon } from '@/components/Display/Icons/Notification'

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
              fill='fill-[--textSecondary]'
              height='h-4'
              width='w-4'
            />
            // <SidebarSimple
            //   size={18}
            //   weight='fill'
            //   className='text-[--textSecondary]'
            // />
          }
          mobile={true}
          action={toggleSidebarVisibility}
        />

        <Logo width={70} />
      </div>

      <div className='flex items-center gap-3'>
        <div className='relative'>
          {/* <div
            className='top-0 right-0 z-[300] absolute mt-1 mr-1'
            aria-hidden='true'
          >
            <span className='relative flex size-2'>
              <span className='inline-flex relative bg-primary rounded-full size-2'></span>
            </span>
          </div> */}

          <NavAction
            type='button'
            desktop={true}
            icon={
              <NotificationIcon
                fill='fill-[--textSecondary]'
                height='h-4'
                width='w-4'
              />
              // <Bell
              //   size={18}
              //   weight='fill'
              //   className='text-[--textSecondary]'
              // />
            }
            mobile={true}
            action={handleNotificationsClick}
          />

          <MenuCard
            handleClickOverlay={handleClickOverlay}
            isMenuOpen={isCardOpen === SearchbarCards.Notifications}
            margin='mt-[115%]'
            width='min-w-72'
          >
            <MenuNotifications />
          </MenuCard>
        </div>

        <div className='relative'>
          <NavAction
            type='button'
            desktop={true}
            icon={
              <SettingIcon
                fill='fill-[--textSecondary]'
                height='h-4'
                width='w-4'
              />
              // <Gear
              //   size={18}
              //   weight='fill'
              //   className='text-[--textSecondary]'
              // />
            }
            mobile={true}
            action={handleSettingsClick}
          />

          <MenuCard
            handleClickOverlay={handleClickOverlay}
            isMenuOpen={isCardOpen === SearchbarCards.Settings}
            margin='mt-[115%]'
            width='min-w-72'
          >
            <MenuSettings />
          </MenuCard>
        </div>

        <ProfilePicture />
      </div>
    </div>
  )
}

export default Searchbar
