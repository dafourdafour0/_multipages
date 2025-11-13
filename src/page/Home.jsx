import me from '../img/person.jpg'
const Home = () => {
    return (
        <>
            <div className='bg-light'>
                <div className="p-3 text-center mt-3 roundded-5">
                    <img
                        src={me}
                        alt="me"
                        style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "6px solid #0082fcff",  
                            boxShadow: "0 8px 16px rgba(107, 184, 255, 0.4)"
                        }}
                    />
                    <h3 className='mt-3'>67114425</h3>
                    <h3> นาย วุฒิเมศร์ พงศ์วราทวีพร</h3>
                    <p className='mt-3'>คณะเทคโนโลยีสารสนเทศ </p>
                    <p>สาขาวิชาวิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์</p>
                    <p>มหาวิทยาลัยศรีปทุม</p>
                    <p>"คอมไม่ได้ค้างนะ คนพิมพ์โค้ดต่างหากที่ค้าง"</p>
                </div>
            </div>
        </>
    )
}

export default Home;