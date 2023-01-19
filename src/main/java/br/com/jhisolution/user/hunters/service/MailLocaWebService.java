package br.com.jhisolution.user.hunters.service;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.springframework.stereotype.Service;

@Service
public class MailLocaWebService {

    static String emailDestinatario = "cuikiri@gmail.com";
    static String nomeDestinatario = "Paulo Venancio Lopes";
    static String emailRemetente = "santafehuntersmail@gmail.com";
    static String nomeRemetente = "Santa Fé Hunters";
    static String assunto = "Assunto do e-mail";
    static String body = "Corpo da mensagem";

    static String protocolo = "smtp";
    static String servidor = "smtplw.com.br"; // do painel de controle do SMTP
    static String username = "cuikiri2017"; // do painel de controle do SMTP
    static String senha = "TFDUXoAM5485"; // do painel de controle do SMTP
    static String porta = "587"; // do painel de controle do SMTP

    public void sendMailLocaWeb() {
        Properties props = new Properties();
        props.put("mail.transport.protocol", protocolo);
        props.put("mail.smtp.host", servidor);
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", porta);

        Session session = Session.getDefaultInstance(props, null);
        session.setDebug(false);

        try {
            InternetAddress iaFrom = new InternetAddress(emailRemetente, nomeRemetente);
            InternetAddress[] iaTo = new InternetAddress[1];
            InternetAddress[] iaReplyTo = new InternetAddress[1];

            iaReplyTo[0] = new InternetAddress(emailDestinatario, nomeDestinatario);
            iaTo[0] = new InternetAddress(emailDestinatario, nomeDestinatario);

            MimeMessage msg = new MimeMessage(session);

            if (iaReplyTo != null) msg.setReplyTo(iaReplyTo);
            if (iaFrom != null) msg.setFrom(iaFrom);
            if (iaTo.length > 0) msg.setRecipients(Message.RecipientType.TO, iaTo);
            msg.setSubject(assunto);
            msg.setSentDate(new Date());

            msg.setContent(body, "text/html");

            Transport tr = session.getTransport(protocolo);
            tr.connect(servidor, username, senha);

            msg.saveChanges();

            tr.sendMessage(msg, msg.getAllRecipients());
            tr.close();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
