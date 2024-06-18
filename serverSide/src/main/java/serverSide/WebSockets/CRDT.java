package serverSide.WebSockets;


import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class CRDT {
    private Node root;
    private Node begin;
    private Node end;

}
