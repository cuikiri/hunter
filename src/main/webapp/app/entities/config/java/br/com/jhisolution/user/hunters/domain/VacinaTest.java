package br.com.jhisolution.user.hunters.domain;

import static org.assertj.core.api.Assertions.assertThat;

import br.com.jhisolution.user.hunters.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VacinaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Vacina.class);
        Vacina vacina1 = new Vacina();
        vacina1.setId(1L);
        Vacina vacina2 = new Vacina();
        vacina2.setId(vacina1.getId());
        assertThat(vacina1).isEqualTo(vacina2);
        vacina2.setId(2L);
        assertThat(vacina1).isNotEqualTo(vacina2);
        vacina1.setId(null);
        assertThat(vacina1).isNotEqualTo(vacina2);
    }
}
