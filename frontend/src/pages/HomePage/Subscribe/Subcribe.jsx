import React from 'react'
import { Box, Container } from '@mui/material'
import "./style.css"
export default function Subcribe() {
  return (
    <div className='subscribe'>
      {/* <div>
        <img src="../img/2.webp" alt="" />
      </div> */}
      <Container className='subcribe__content ' maxWidth="xl">
        <div>

        </div>
        <div className='subcribe__content-right'>
          <div className='subcribe__content-text '>
            <h1 className='text-2xl uppercase'>Tin tức và cập nhật mới</h1>
            <p>Chúng tôi rất thích nếu bạn đăng ký nhận bản tin của chúng tôi! Bạn cũng sẽ thích nó.</p>
            <div className="newsletter__box">
              <input type="email" value="" name="email" className="email" placeholder="Your email address" required="" />
              <button type="submit">Subscribe</button>
            </div>
          </div>

        </div>

      </Container>


    </div>
  )
}
