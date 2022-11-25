package br.com.jhisolution.user.hunters.domain;

import static org.assertj.core.api.Assertions.assertThat;

import br.com.jhisolution.user.hunters.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DecisaoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Decisao.class);
        Decisao decisao1 = new Decisao();
        decisao1.setId(1L);
        Decisao decisao2 = new Decisao();
        decisao2.setId(decisao1.getId());
        assertThat(decisao1).isEqualTo(decisao2);
        decisao2.setId(2L);
        assertThat(decisao1).isNotEqualTo(decisao2);
        decisao1.setId(null);
        assertThat(decisao1).isNotEqualTo(decisao2);
    }
}
