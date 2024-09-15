import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const CourseCard = ({ course }) => {
  const router = useRouter()
  const t = useTranslations('course_card')
  const handleViewDetails = () => {
    router.push(`/user/courses?id=${course.id}`)
  }

  return (
    <Card className='w-[300px] max-w-sm mx-auto flex flex-col h-full transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg'>
      <CardHeader className='pb-2'>
        <Image
          src={course.image_url}
          alt={course.title}
          height={38}
          width={500}
          className='w-full h-38 object-cover rounded-lg'
        />
        <CardDescription className='overflow-hidden whitespace-nowrap text-ellipsis'>
          {' '}
          {t('category')} : {course.category.name}
        </CardDescription>
        <div>
          <Tooltip>
            <TooltipTrigger>
              <CardTitle className='text-lg uppercase font-bold overflow-hidden whitespace-nowrap text-ellipsis max-w-[50%]'>
                {course.title}
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent side='top'>
              <p>{course.title}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>

      <CardContent className='flex-grow'>
        <div className='flex items-center mb-3 space-x-2'>
          <svg width='24px' height='24px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M10.05 2.53004L4.03002 6.46004C2.10002 7.72004 2.10002 10.54 4.03002 11.8L10.05 15.73C11.13 16.44 12.91 16.44 13.99 15.73L19.98 11.8C21.9 10.54 21.9 7.73004 19.98 6.47004L13.99 2.54004C12.91 1.82004 11.13 1.82004 10.05 2.53004Z'
              stroke='currentColor'
              stroke-width='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M5.63 13.08L5.62 17.77C5.62 19.04 6.6 20.4 7.8 20.8L10.99 21.86C11.54 22.04 12.45 22.04 13.01 21.86L16.2 20.8C17.4 20.4 18.38 19.04 18.38 17.77V13.13'
              stroke='currentColor'
              stroke-width='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M21.4 15V9'
              stroke='currentColor'
              stroke-width='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
          <p className='font-medium'>{course.teacher.name}</p>
        </div>

        <div className='flex items-center space-x-2'>
          <svg width='24px' height='24px' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'>
            <path
              stroke='#ffffff'
              d='M4.29289,4.297105 L8,0.59 L11.7071,4.297105 C12.0976,4.687635 12.0976,5.320795 11.7071,5.711315 C11.3166,6.101845 10.6834,6.101845 10.2929,5.711315 L9,4.418425 L9,11.004215 C9,11.004515 9,11.003915 9,11.004215 L9,12.004215 C9,12.556515 9.44772,13.004215 10,13.004215 L14,13.004215 C14.5523,13.004215 15,13.451915 15,14.004215 C15,14.556515 14.5523,15.004215 14,15.004215 L10,15.004215 C8.34315,15.004215 7,13.661115 7,12.004215 L7,4.418425 L5.70711,5.711315 C5.31658,6.101845 4.68342,6.101845 4.29289,5.711315 C3.90237,5.320795 3.90237,4.687635 4.29289,4.297105 Z'
            />
          </svg>
          <span className=' '>{course.level}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button onClick={handleViewDetails} className='w-full'>
          {t('detail')}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CourseCard
