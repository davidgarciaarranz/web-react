import "./DescriptionGeneral.scss";
import { sanitize } from "../../utils/sanitize";

interface DescriptionProps {
    content: string;
}

const Description = ({ content }: DescriptionProps) => {
    return (
        <article
            id="newsletter"
            className="description"
            dangerouslySetInnerHTML={{ __html: sanitize(content) }}
        />
    );
};

export default Description;