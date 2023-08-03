import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Entity } from "@/core/entities/entity";

export interface AttachmentProps {
  title: string;
  link: string;
}

export class Attachment extends Entity<AttachmentProps> {
  get title() {
    return this.props.title;
  }

  get link() {
    return this.props.link;
  }

  set title(title: string) {
    this.props.title = title;
  }

  set link(link: string) {
    this.props.link = link;
  }

  static create(props: AttachmentProps, id?: UniqueEntityId) {
    const attachment = new Attachment(props, id);

    return attachment;
  }
}
