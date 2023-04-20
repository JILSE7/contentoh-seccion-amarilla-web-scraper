import { FireOutlined } from "@ant-design/icons"


const Header = () => {
  return (
    <header style={{position: 'absolute', top: 0 , left: 0, width: '99vw', display:'flex', justifyContent: 'space-between', padding: 10, alignItems: 'center'}}>
      <img width={50} src="https://media.licdn.com/dms/image/C4E0BAQE8c1ZHYw22dQ/company-logo_200_200/0/1642451548449?e=2147483647&v=beta&t=_iSbhCzXnIrUgZjG55uHFZCF3pudSV0apmO1lHFdtBY"/>
      <h3>Restaurant app <FireOutlined style={{color: '#e0e32e'}} /></h3>
      <span>Said Mandujano</span>
    </header>
  )
}

export default Header