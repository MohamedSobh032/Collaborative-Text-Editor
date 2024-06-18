package serverSide.WebSockets;

import lombok.*;

import java.util.List;
import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Node {
    private Map<String, Object> Data;
    private List<Node> Children;
    private boolean isDeleted;
    private int position;

    public Node(Map<String, Object> data, List<Node> children, int position) {
        Data = data;
        Children = children;
        this.position = position;
        isDeleted = false;
    }
}
