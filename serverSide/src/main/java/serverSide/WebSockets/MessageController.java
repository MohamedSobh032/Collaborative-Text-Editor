package serverSide.WebSockets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import serverSide.Database.Documents.DocumentsService;

import java.util.*;

@Controller
public class MessageController {

    @Autowired
    private DocumentsService documentsService;

    private Map<String, String> userDocumentMap = new HashMap<>();
    private Map<String, List<Object>> documentDeltas = new HashMap<>();

    @MessageMapping("/{id}/sendData")
    @SendTo("/topic/public/{id}")
    public Object sendData(@Payload Map<String, Object> payload, @DestinationVariable String id) {
        List<Object> deltas = documentDeltas.computeIfAbsent(id, k -> new ArrayList<>());
        deltas.add(payload.get("delta"));
        return payload;
    }

    @MessageMapping("/{id}/saveData")
    @SendTo("/topic/public/dont'care")
    public Object saveData(@Payload Map<String, Object> payload, @DestinationVariable String id) {
        documentsService.updateData(id, payload.get("delta"));
        return payload;
    }

    @SubscribeMapping("/subscribe/{docId}/{userId}")
    public Object subscribe(@DestinationVariable String docId,
                            @DestinationVariable String userId,
                            SimpMessageHeaderAccessor simpMessageHeaderAccessor) {
        if (userDocumentMap.containsKey(userId)) { return null; }
        userDocumentMap.put(userId, docId);
        Objects.requireNonNull(simpMessageHeaderAccessor.getSessionAttributes()).put("docId", docId);
        Objects.requireNonNull(simpMessageHeaderAccessor.getSessionAttributes()).put("userId", userId);
        Object[] result = new Object[2];
        result[0] = documentsService.getDocumentById(docId).getData();
        result[1] = documentDeltas.getOrDefault(docId, null);
        return result;
    }

    @EventListener
    public void onDisconnectEvent(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String docId = (String) Objects.requireNonNull(headerAccessor.getSessionAttributes()).get("docId");
        String userId = (String) Objects.requireNonNull(headerAccessor.getSessionAttributes()).get("userId");
        userDocumentMap.remove(userId);
        if (!userDocumentMap.containsValue(docId)) {
            documentDeltas.remove(docId);
        }

    }
}