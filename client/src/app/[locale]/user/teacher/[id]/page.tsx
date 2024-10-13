'use client'
import { useTranslations } from 'next-intl'
import React, { Fragment, useEffect, useState } from 'react'
import CoverImage from '@/src/app/assets/CoverImage.jpg'
import avtDefault from '@/src/app/assets/avtDefault.png'
import Image from 'next/image'
import { Avatar, AvatarImage } from '@/src/components/ui/avatar'
import http from '@/src/app/utils/http'
import { useAppDispatch } from '@/src/app/hooks/store'
import { failPopUp } from '@/src/app/hooks/features/popup.slice'
import { Button } from '@/src/components/ui/button'
import { CldUploadButton } from 'next-cloudinary'
import UploadButton from '@/src/components/ui/uploadButton'
import { CookieValueTypes, getCookie, hasCookie } from 'cookies-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/src/components/ui/dropdown-menu'
import { LuBellRing } from 'react-icons/lu'
import { AiOutlineUserDelete } from 'react-icons/ai'
import { TooltipProvider } from '@/src/components/ui/tooltip'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/src/components/ui/carousel'
import CourseCard from '@/src/components/CourseCard'
import { Teacher } from '@/src/app/types/teacher.type'
import { MdSlowMotionVideo } from 'react-icons/md'
import { BsJournalBookmarkFill } from 'react-icons/bs'
import { TbInfoSquareRounded } from 'react-icons/tb'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { TiBusinessCard } from 'react-icons/ti'
import { Skeleton } from '@/src/components/ui/skeleton'
import SkeletonCourse from '@/src/components/SkeletonCourse/SkeletonCourse'

type resProfileTeacher = {
  profile: Teacher
  follower_count: number
}

export default function ProfileTeacher({ params }: { params: { id: string } }) {
  const t = useTranslations('profile_teacher')
  const teacherId = params.id
  const [role, setRole] = useState<CookieValueTypes>()
  const [profileTeacher, setProfileTeacher] = useState<resProfileTeacher>()
  const [imageAvatar, setImageAvatar] = useState<string>('')
  const [coverImage, setCoverImage] = useState<string>('')
  const [position, setPosition] = useState('Đã đăng ký')
  const [loading, setLoading] = useState<boolean>(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    document.title = t('title')
  }, [t])

  useEffect(() => {
    if (hasCookie('role')) {
      setRole(getCookie('role'))
      return
    }
  }, [])

  useEffect(() => {
    const fetchProfileTeacher = async () => {
      try {
        const res: { data: { message: resProfileTeacher } } = await http.get(`teachers/${teacherId}`)
        setProfileTeacher(res.data.message)
      } catch (error: any) {
        const message = error?.response?.data?.error || error.message || t('error')
        dispatch(failPopUp(message))
      } finally {
        setLoading(false)
      }
    }
    fetchProfileTeacher()

    return
  }, [dispatch, teacherId, t])

  return (
    <div className='flex flex-row'>
      <div className='container mx-auto my-8'>
        <div className='relative'>
          {loading ? (
            <Skeleton className='h-[125px] w-full rounded-xl' />
          ) : (
            <div className='relative'>
              <Image
                src={coverImage ? coverImage : CoverImage.src}
                height={0}
                width={0}
                layout='responsive'
                className='rounded-3xl'
                alt='rikimo'
              />
              {role === 'teacher' ? (
                <div className='absolute bottom-2 right-2 z-10'>
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onSuccess={(result: any) => {
                      setCoverImage(result?.info?.secure_url)
                    }}
                    uploadPreset='s2lo0hgq'
                  >
                    <UploadButton />
                  </CldUploadButton>
                </div>
              ) : null}
            </div>
          )}
          <div className='flex flex-col lg:flex-row mt-7'>
            {loading ? (
              <Skeleton className='h-36 w-36 rounded-full' />
            ) : (
              <div className='rounded-full bg-primary border-white h-36 w-36'>
                <div className='relative'>
                  <Avatar className='h-36 w-36'>
                    <AvatarImage
                      src={profileTeacher?.profile?.image_url ? profileTeacher?.profile?.image_url : avtDefault.src}
                    />
                  </Avatar>
                  {role === 'teacher' ? (
                    <div className='absolute bottom-2 right-2 z-10'>
                      <CldUploadButton
                        options={{ maxFiles: 1 }}
                        onSuccess={(result: any) => {
                          setImageAvatar(result?.info?.secure_url)
                        }}
                        uploadPreset='s2lo0hgq'
                      >
                        <UploadButton />
                      </CldUploadButton>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
            <div className='flex items-center ml-4'>
              <div className='flex-row'>
                {loading ? (
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-[250px]' />
                    <Skeleton className='h-4 w-[200px]' />
                    <Skeleton className='h-4 w-[250px]' />
                    <Skeleton className='h-4 w-[200px]' />
                  </div>
                ) : (
                  <Fragment>
                    <h1 className='text-4xl font-black'>{profileTeacher?.profile?.name}</h1>
                    <h2 className='flex gap-3 mt-1 text-gray'>
                      @{profileTeacher?.profile?.account?.email}
                      <p className='text-sm'>•</p>
                      {profileTeacher?.follower_count} {t('follower')}
                    </h2>
                    <div className='mt-2'>
                      {position === 'Đã đăng ký' ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='outline' className='rounded-full bg-gray-300'>
                              <>
                                <LuBellRing className='mr-2' />
                                {position}
                              </>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className='w-56'>
                            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                              <DropdownMenuRadioItem value='Đã đăng ký'>
                                <LuBellRing className='mr-2' />
                                {t('all')}
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value='Hủy đăng ký'>
                                <AiOutlineUserDelete className='mr-2' />
                                {t('unsubscribe')}
                              </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <Button>{t('register')}</Button>
                      )}
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='mt-6'>
          <Card>
            {loading ? (
              <div className='space-y-2 m-5'>
                <Skeleton className='h-4 w-2/5 my-1' />
                <Skeleton className='h-4 w-1/3 my-1' />
                <Skeleton className='h-4 w-2/5 my-1' />
                <Skeleton className='h-4 w-1/3 my-1' />
                <Skeleton className='h-4 w-2/5 my-1' />
                <Skeleton className='h-4 w-1/3 my-1' />
              </div>
            ) : (
              <Fragment>
                <CardHeader>
                  <CardTitle>{t('introduce')}</CardTitle>
                  <CardDescription>{profileTeacher?.profile?.bio}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h1 className='text-lg font-black'>{t('channel_details')}</h1>
                  <div className='flex mt-3'>
                    <TiBusinessCard size={25} className='mr-2 ml-1' />
                    {profileTeacher?.profile?.job_title}
                  </div>
                  <div className='flex mt-3 ml-1'>
                    <MdSlowMotionVideo size={25} className='mr-2' />
                    {profileTeacher?.profile?.courses?.length} {t('course')}
                  </div>
                  <div className='flex mt-3'>
                    <BsJournalBookmarkFill size={25} className='mr-2 ml-1' />
                    {profileTeacher?.profile?.experience}
                  </div>
                  <div className='flex mt-3'>
                    <TbInfoSquareRounded size={25} className='mr-2 ml-1' />
                    {t('participated')}
                    {'  '}
                    {profileTeacher?.profile?.created_at
                      ? new Date(profileTeacher?.profile?.created_at).toISOString().split('T')[0]
                      : 'N/A'}
                  </div>
                </CardContent>
              </Fragment>
            )}
          </Card>
        </div>
        <h1 className='text-4xl font-black my-10'>{t('list_course')}</h1>
        {loading ? (
          <div className='flex gap-20 justify-center'>
            <SkeletonCourse />
            <SkeletonCourse />
            <SkeletonCourse />
            <SkeletonCourse />
          </div>
        ) : (
          <div className='flex justify-center'>
            <div className='flex-col w-full'>
              <div className='flex flex-row w-full'>
                <TooltipProvider>
                  <Carousel className='w-full'>
                    <CarouselContent className='-ml-4 md:-ml-1'>
                      {profileTeacher?.profile.courses?.map((course, index) => (
                        <CarouselItem key={index} className='pl-4 mb-6 md:basis-1/2 lg:basis-1/4'>
                          <div className='mt-3 h-full'>
                            <CourseCard course={course} teacher={profileTeacher?.profile?.name} />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </TooltipProvider>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}