'use client'
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { BellIcon } from '@/components/Display/Icons/Bell'
import { SidebarIcon } from '@/components/Display/Icons/Sidebar'
import { Logo } from '@/components/Display/Logo'
import { NavAction } from '@/components/Inputs/Button/NavAction'
import { MenuCard } from '@/components/Navigation/MenuCard'
import { MenuNotifications } from '@/components/Template/MenuNotifications'
import { TakeoutModal } from '@/components/Template/TakeoutModal'
import useSidebar from '@/lib/context/global'
import { IdentificationIcon } from '@/components/Display/Icons/Identification'
import { getNotifications } from '@/services/Notification'

enum SearchbarCards {
  Settings,
  Notifications,
  Default,
}

const Searchbar: React.FC = () => {
  const [modalStatus, setModalStatus] = useState(false)
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false)

  const handleCloseModal = useCallback(() => {
    setCardOpen(SearchbarCards.Default)
    setModalStatus(prev => !prev)
  }, [])

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

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await getNotifications({ status: 'RECEIVED' })
      if (response && response.status === 200) {
        const data = response.data
        if (data.total > 0) {
          setHasUnreadNotifications(true)
        } else {
          setHasUnreadNotifications(false)
        }
      }
    }

    fetchNotifications()

    const interval = setInterval(fetchNotifications, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='h-[calc(50px+(env(safe-area-inset-top)))] min-h-[calc(50px+(env(safe-area-inset-top)))] pt-[calc(env(safe-area-inset-top))] flex justify-between items-center col-span-full bg-[--backgroundSecondary] px-3 sm:pt-0 w-full sm:w-auto lg:h-[50px]'>
      <TakeoutModal
        title=''
        isModalOpen={modalStatus}
        handleClickOverlay={handleCloseModal}
      />
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
        <NavAction
          type='button'
          desktop={true}
          icon={
            <IdentificationIcon
              size='size-5'
              stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
            />
          }
          mobile={true}
          action={handleCloseModal}
        />

        <div className='relative'>
          <NavAction
            type='button'
            desktop={true}
            icon={
              <span className='relative'>
                <BellIcon
                  size='size-5'
                  stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
                />
                {hasUnreadNotifications && (
                  <span className='block top-0 right-0 absolute justify-center items-center bg-[--primaryColor] rounded-full w-2 h-2'></span>
                )}
              </span>
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
              <BellIcon
                size='size-5'
                stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
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
      </div>
    </div>
  )
}

export default Searchbar
