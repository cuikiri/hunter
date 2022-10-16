package br.com.jhisolution.user.hunters.domain;

import static org.assertj.core.api.Assertions.assertThat;

import br.com.jhisolution.user.hunters.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ReuniaoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Reuniao.class);
        Reuniao reuniao1 = new Reuniao();
        reuniao1.setId(1L);
        Reuniao reuniao2 = new Reuniao();
        reuniao2.setId(reuniao1.getId());
        assertThat(reuniao1).isEqualTo(reuniao2);
        reuniao2.setId(2L);
        assertThat(reuniao1).isNotEqualTo(reuniao2);
        reuniao1.setId(null);
        assertThat(reuniao1).isNotEqualTo(reuniao2);
    }
}
