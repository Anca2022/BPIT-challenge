import './otherPage.scss';

export default function OtherPage(props : React.PropsWithChildren){
    return (
        <div className="other-pages">
            <h1 className="other-page-title">
                {props.children}
            </h1>
            <p className="other-page-message">
                Nothing to see here, just an empty page.
            </p>
        </div>
    )
}