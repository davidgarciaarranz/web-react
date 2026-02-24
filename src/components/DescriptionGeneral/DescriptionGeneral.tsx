interface DescriptionProps {
    content: string;
}

const Description = ({ content }: DescriptionProps) => {
    return (
        <article
            id="newsletter"
            className="description"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

export default Description;