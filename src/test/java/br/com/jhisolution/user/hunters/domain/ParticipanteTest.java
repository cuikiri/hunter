package br.com.jhisolution.user.hunters.domain;

import static org.assertj.core.api.Assertions.assertThat;

import br.com.jhisolution.user.hunters.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ParticipanteTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Participante.class);
        Participante participante1 = new Participante();
        participante1.setId(1L);
        Participante participante2 = new Participante();
        participante2.setId(participante1.getId());
        assertThat(participante1).isEqualTo(participante2);
        participante2.setId(2L);
        assertThat(participante1).isNotEqualTo(participante2);
        participante1.setId(null);
        assertThat(participante1).isNotEqualTo(participante2);
    }
}
