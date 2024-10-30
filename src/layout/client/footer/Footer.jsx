import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.css';
import { display, margin } from '@mui/system';
import { Flex } from 'antd';


const Footer = () => {
    return (
        <div className="footer">
            <div className="d-flex py-5" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="row1" style={{ marginRight: 'px', marginLeft: '40px', width: '500px' }}>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <svg width="86" height="100" viewBox="0 0 46 55" fill="none" xmlns="http://www.w3.org/2000/svg" className='mb-3'>
                                <g clipPath="url(#clip0)">
                                    <path d="M19.6667 55C8.82205 55 0 46.2504 0 35.4968C0 24.7431 8.82292 15.9935 19.6667 15.9935C30.5105 15.9935 39.3334 24.7431 39.3334 35.4968C39.3334 46.2504 30.5122 55 19.6667 55ZM19.6667 17.8563C9.8587 17.8563 1.87839 25.7686 1.87839 35.4959C1.87839 45.2233 9.8587 53.1355 19.6667 53.1355C29.4747 53.1355 37.4559 45.2215 37.4559 35.4942C37.4559 25.7668 29.4765 17.8563 19.6667 17.8563Z" fill="#2196F3" />
                                    <path d="M33.9387 36.3618C33.3269 34.1133 27.7188 33.8706 24.3807 34.6949C22.6326 35.1283 20.846 35.6917 19.0034 36.0159C20.3521 37.2026 21.8005 38.3251 23.879 38.6042C29.0361 39.2942 32.2404 37.6898 33.9387 36.3618Z" fill="#2196F3" />
                                    <path d="M23.8788 38.6042C21.7959 38.3251 20.3519 37.2026 19.0032 36.016C16.9159 34.1792 15.0594 32.189 11.4154 32.9379C5.62198 34.1289 4.85978 40.9247 9.3333 45.2917C11.254 47.2864 13.7197 48.6822 16.4284 49.3079C19.137 49.9336 21.9709 49.7621 24.5828 48.8144C27.1946 47.8667 29.4709 46.1839 31.1327 43.9724C32.7945 41.7608 33.7696 39.1165 33.9385 36.3635C32.2402 37.6898 29.0358 39.2942 23.8788 38.6042Z" fill="#673AB7" />
                                    <path d="M26.9105 23.8962C26.1876 25.4331 32.6321 27.1381 33.4031 32.2419C33.7746 27.2178 27.8046 21.9962 26.9105 23.8962Z" fill="#2196F3" />
                                    <path d="M13.3649 30.3107C14.5267 29.8335 15.0784 28.5126 14.5972 27.3604C14.116 26.2083 12.784 25.6611 11.6222 26.1384C10.4604 26.6156 9.90867 27.9365 10.3899 29.0887C10.8712 30.2408 12.2031 30.7879 13.3649 30.3107Z" fill="#673AB7" />
                                    <path d="M18.5351 24.1103C19.0786 23.5714 19.0786 22.6977 18.5351 22.1587C17.9917 21.6198 17.1106 21.6198 16.5672 22.1587C16.0238 22.6977 16.0238 23.5714 16.5672 24.1103C17.1106 24.6492 17.9917 24.6492 18.5351 24.1103Z" fill="#2196F3" />SVG namespacewww.w3.org09:42/-strong/-heart:>:o:-((:-h<path d="M23.4513 15.2376C25.4617 9.3485 24.1103 4.64345 19.9786 2.40881C17.1544 2.97831 15.4779 4.334 14.5444 6.20544C20.0843 5.76077 23.5999 9.1994 23.4513 15.2376Z" fill="#2196F3" />
                                    <path d="M46.0001 10.0923C36.0487 6.55051 29.7685 7.76491 28.7808 15.8349C34.4841 21.6703 40.2286 18.8774 46.0001 10.0923Z" fill="#2196F3" />
                                    <path d="M38.0851 6.89635C38.5466 4.94082 38.7861 2.6299 38.8219 0C28.5017 2.27885 23.8473 6.6337 27.3584 13.9782C27.5333 14.0198 27.7011 14.0536 27.8698 14.0883C28.6905 8.34132 32.3031 6.2133 38.0851 6.89635Z" fill="#2196F3" />
                                </g>
                                <defs>
                                    <clipPath id="clip0">
                                        <rect width="46" height="55" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <h5 className="footer-title mb-4" style={{ color: '#6A0DAD' }}>Chúng tôi có mọi loại áo phông!</h5>
                            <h6 className="newsletter-title mb-4" style={{ marginTop: '110px' }}>Theo dõi bản tin của chúng tôi</h6>
                            <form action="">
                                <div className="input-group justify-content-center">
                                    <input style={{ width: '200px' }} type="text" className="form-control" placeholder="YOUR EMAIL ADDRESS" aria-label="Subscriber's email" aria-describedby="basic-addon2" />
                                    <button className="btn btn-subscribe" type="submit">SUBSCRIBE</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row1" style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div className="row" style={{ marginLeft: '100px' }}>
                        <div>
                            <h6>Về Berry</h6>
                            <ul className="list-unstyled">
                                <li className='mb-2'>Giới thiệu</li>
                                <li className='mb-2'>Liên hệ</li>
                                <li className='mb-2'>Tin tức</li>
                                <li className='mb-2'>Hệ thống cửa hàng</li>
                                <li className='mb-2'>Tin khuyến mãi</li>
                            </ul>
                        </div>
                        <div className='mt-4'>
                            <h6>Dịch vụ khách hàng</h6>
                            <ul className="list-unstyled">
                                <li className='mb-2'>Chính sách đổi trả</li>
                                <li className='mb-2'>Chính sách bảo mật</li>
                                <li className='mb-2'>Chính sách thanh toán, giao nhận</li>
                                <li className='mb-2'>Hướng dẫn chọn size</li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-5">
                            <h6>Chuyển hàng</h6>
                            <ul className="list-unstyled">
                                <li className='mb-2'>Về miễn phí vận chuyển</li>
                                <li className='mb-2'>Thông tin vận chuyển</li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="" style={{ marginTop: '70px' }}>
                                <h6 className='mb-3'>Berry lắng nghe bạn</h6>
                                <div className="d-flex  mb-3">
                                    <a href="#" className="me-3 footer-icon"><FaFacebook size={32} color="#6A0DAD" /></a>
                                    <a href="#" className="me-3 footer-icon"><FaInstagram size={32} color="#6A0DAD" /></a>
                                    <a href="#" className="me-3 footer-icon"><FaYoutube size={32} color="#6A0DAD" /></a>
                                </div>
                                <div className='my-2'>
                                    <p>Chúng tôi luôn trân trọng và mong đợi nhận được mọi<br /></p>
                                    <p>ý kiến đóng góp của khách hàng để có thể nâng cấp trải <br /></p>
                                    <p>nghiệm dịch vụ và sản phẩm tốt hơn nữa.</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row " style={{ marginRight: '40px' }}>
                        <div className="">
                            <h6 className='mb-2'>Địa chỉ liên hệ</h6>
                            <ul className="list-unstyled">
                                <li>Địa chỉ: Liên Mạc, Bắc Từ Liêm, Hà Nội</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="text-center mt-4">
                <p>Copyright © 2022 The Meow Shop. All rights reserved</p>
            </div>
        </div>

    );
};

export default Footer;