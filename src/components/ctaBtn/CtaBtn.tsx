import "./ctaBtn.scss";

interface BtnProps{
    handleClick?:()=>void;
}
export default function CtaBtn({handleClick, children} : React.PropsWithChildren<BtnProps>){
return (
    <button className='cta-btn' 
    onClick={handleClick}
    >
        {children}
    </button>); 
}
