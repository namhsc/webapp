import * as React from 'react';

import MainLayout from '@/components/layout/MainLayout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Vercel from '~/svg/Vercel.svg';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <MainLayout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <Vercel className='text-5xl' />
            <h1 className='mt-4'>Cộng hòa xã hội chủ nghĩa Việt Nam</h1>
            <p className='mt-2  text-gray-800'>
              Cách đây 4 ngày, Al Nassr gây thất vọng khi để thua Al Ittihad ở
              Saudi Pro League. Ronaldo và các đồng đội bế tắc trong suốt 90
              phút và chấp nhận trắng tay bởi pha lập công duy nhất của
              Romarinho cuối trận. Đó mới chỉ là trận thua thứ hai của Al Nassr
              mùa này, chấm dứt chuỗi 18 trận bất bại, nhưng tai hại hơn là Al
              Nassr rơi xuống vị trí thứ hai và kém Al Ittihad 1 điểm trên bảng
              xếp hạng Saudi Pro League. Sự tập trung của Al Nassr giờ sẽ chuyển
              sang Cúp Nhà vua Saudi Arabia, giải đấu mà họ đã không thể vô địch
              kể từ năm 1990. Phía bên kia, Abha đã không thắng 5 trận gần nhất.
              Họ thua 4 trận liên tiếp trước khi hòa 2-2 với Al Fateh. Đây sẽ là
              cơ hội để Al Nassr lấy lại tự tin sau trận thua ở Saudi Pro
              League. Đặc biệt là với Ronaldo, sau 1 tuần thăng hoa 2 hat-trick
              và 2 pha kiến ​​tạo, tiền đạo 38 tuổi chưa có bàn nào ở 2 trận gần
              nhất.
            </p>
            <p className='mt-2 text-sm text-gray-700'>
              <ArrowLink href='https://github.com/theodorusclarence/ts-nextjs-tailwind-starter'>
                See the repository
              </ArrowLink>
            </p>

            <ButtonLink className='mt-6' href='/components' variant='light'>
              See all components
            </ButtonLink>

            <UnstyledLink
              href='https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Ftheodorusclarence%2Fts-nextjs-tailwind-starter'
              className='mt-4'
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                width='92'
                height='32'
                src='https://vercel.com/button'
                alt='Deploy with Vercel'
              />
            </UnstyledLink>

            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink href='https://theodorusclarence.com?ref=tsnextstarter'>
                Theodorus Clarence
              </UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
