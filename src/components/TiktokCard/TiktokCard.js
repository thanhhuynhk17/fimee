import Card from '../Card/Card';

function TiktokCard({className}) {
    return (
        <Card
            className={`
				bg-black
				drop-shadow-[-4px_-0px_1px_#28ffff]
				shadow-[4px_1px_1px_#fe2d52]
				${className}
			`}
        >
            <div className={`
				flex flex-col text-white
			`}>
                <p>Hello world</p>
                <p>Hello world</p>
                <p>Hello world</p>
            </div>
        </Card>
    );
}

export default TiktokCard;
